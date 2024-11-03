"use client";

import React, { useState, useEffect } from "react";
import {
  useAddStudentMutation,
  useUpdateStudentMutation,
  useGetStudentQuery,
} from "../../app/features/StudentSlice";
import { useRouter } from "next/navigation";
import { Student } from "../../models/student.model"; // Assuming you have this model

const AddEdit = ({ studentId = null }: { studentId?: string | null }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<any>({
    studentName: "",
    studentEmail: "",
  });

  const [addStudent] = useAddStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();
  const { data: student, isSuccess } = useGetStudentQuery(studentId ?? "", {
    skip: !studentId,
  });

  useEffect(() => {
    if (isSuccess && studentId && student) {
      setFormData({
        studentName: student.studentName,
        studentEmail: student.studentEmail,
      });
    }
  }, [isSuccess, studentId, student]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId) {
      // Assuming Student has an `id` field.
      await updateStudent({ id: studentId, ...formData });
    } else {
      await addStudent(formData);
    }
    router.push("/");
  };
  console.log(formData);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Student Name</label>
        <input
          className="border-2 border-sky-500"
          type="text"
          value={formData.studentName}
          onChange={(e) =>
            setFormData({ ...formData, studentName: e.target.value })
          }
        />
      </div>
      <div>
        <label>Student Email</label>
        <input
          type="email"
          className="border-2 border-sky-500"
          value={formData.studentEmail}
          onChange={(e) =>
            setFormData({ ...formData, studentEmail: e.target.value })
          }
        />
      </div>
      <button className="border-2 border-red-500" type="submit">
        {studentId ? "Update" : "Create"} Student
      </button>
    </form>
  );
};

export default AddEdit;
