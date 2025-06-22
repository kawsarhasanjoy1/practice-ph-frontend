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
  }),
});

export const { useCreateStudentMutation, useGetStudentsQuery } =
  userManagementApi;
