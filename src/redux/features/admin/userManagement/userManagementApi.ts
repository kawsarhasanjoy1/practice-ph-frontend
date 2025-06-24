import { TQueryValue } from "../../../../type/global";
import baseApi from "../../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
    getStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        args.forEach((value: TQueryValue) => {
          params.append(value?.name, value.value);
        });
        return {
          url: "/students",
          method: "GET",
          params,
        };
      },
    }),
    createFaculty: builder.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),
    getFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        args.forEach((value: TQueryValue) => {
          params.append(value?.name, value.value);
        });
        return {
          url: "/faculties",
          method: "GET",
          params,
        };
      },
    }),
    getAssignFaculties: builder.query({
      query: ({ id }) => {
        return {
          url: `courses/${id}/get-faculties`,
          method: "GET",
        };
      },
    }),
    assignFaculty: builder.mutation({
      query: (args) => ({
        url: `/courses/${args?.id}/assign-faculties`,
        method: "PUT",
        body: args.data,
      }),
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateFacultyMutation,
  useGetStudentsQuery,
  useCreateStudentMutation,
  useCreateAdminMutation,
  useGetFacultiesQuery,
  useAssignFacultyMutation,
  useGetAssignFacultiesQuery,
  useChangePasswordMutation
} = userManagementApi;
