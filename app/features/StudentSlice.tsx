import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Student } from "../../models/student.model";

// Create the studentApi using RTK Query
//createApi function will take object ,inside object baseQuery is a key which handle fetchBaseQuery function
//inside fetchBaseQuery function will take obj which took baseUrl,endpoints which define the variant endpoints and every end points create their own hook
//query is a callback function which return which particular url we should pass the url
//tagTypes automatically refetch,tagTypes and providesTags and invalidatesTags are doing the same thing
//here in transformResponse you can manipulate or reverse response - transformResponse:(task)=>task.reverse()

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["student"],

  endpoints: (builder) => ({
    getStudents: builder.query<Student[], void>({
      query: () => "/students",
      transformResponse: (response: any) => {
        console.log(response);
        return response;
      },
      providesTags: ["student"],
    }),

    getStudent: builder.query<Student, string>({
      query: (id) => `/students/${id}`,
      providesTags: ["student"],
    }),

    addStudent: builder.mutation<void, Student>({
      query: (student) => {
        return {
          url: "/students",
          method: "POST",
          body: student,
        };
      },
      invalidatesTags: ["student"],
    }),

    updateStudent: builder.mutation<void, Student>({
      query: ({ id, ...student }) => ({
        url: `/students/${id}`,
        method: "PUT",
        body: student,
      }),
      invalidatesTags: ["student"],
    }),

    deleteStudent: builder.mutation<void, string>({
      query: (id) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["student"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;
