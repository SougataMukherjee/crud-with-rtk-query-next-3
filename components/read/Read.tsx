"use client";

import React from "react";
import {
  useGetStudentsQuery,
  useDeleteStudentMutation,
} from "../../app/features/StudentSlice";
import Link from "next/link";

const Read = () => {
  const { data: students, isLoading, isError } = useGetStudentsQuery();
  const [deleteStudent] = useDeleteStudentMutation();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading students</p>;
  const handleDelete = (id: any) => {
    if (id) {
      deleteStudent(id);
    }
  };

  return (
    <div>
      <h2>Student List</h2>
      {students?.map((student) => (
        <div key={student.id}>
          <p>
            {student.studentName} - {student.studentEmail}
          </p>
          <button onClick={() => handleDelete(student.id)}>Delete</button>
          <Link href={`/edit/${student.id}`}>Edit</Link>
        </div>
      ))}
    </div>
  );
};

export default Read;
