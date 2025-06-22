import baseApi from "../../../api/baseApi";

const academicFacultyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),
    getAcademicFaculty: builder.query({
      query: () => {
        return {
          url: "/academic-faculties",
          method: "GET",
        };
      },
      transformResponse: (response) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    getSingleAcademicFaculty: builder.query({
      query: (id: string) => ({
        url: `/academic-faculties/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateAcademicFacultyMutation,
  useGetAcademicFacultyQuery,
  useGetSingleAcademicFacultyQuery,
} = academicFacultyApi;
