
import { TQueryValue } from "../../../../type/global";
import baseApi from "../../../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryValue) => {
            params.append(item?.name, item?.value);
          });
        }
        return {
          url: "/academic-semesters",
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    createAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
    getSingleAcademicSemester: builder.query({
      query: (id: string) => ({
        url: `/academic-semesters/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAcademicSemesterQuery,
  useCreateAcademicSemesterMutation,
  useGetSingleAcademicSemesterQuery,
} = academicSemesterApi;
