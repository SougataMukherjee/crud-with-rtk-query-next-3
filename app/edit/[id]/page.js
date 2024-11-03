"use client";
import { useParams } from "next/navigation";
import AddEdit from "../../../components/edit/AddEdit";

export default function EditPage() {
  const { id } = useParams();
  return (
    <div>
      <h2>Edit Student</h2>
      <AddEdit studentId={id} />
    </div>
  );
}
