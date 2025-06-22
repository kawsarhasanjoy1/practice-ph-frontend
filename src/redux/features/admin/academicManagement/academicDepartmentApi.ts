import baseApi from "../../../api/baseApi";

const academicDepartmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
    }),
    getAcademicDepartment: builder.query({
      query: () => {
        return {
          url: "/academic-departments",
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
    getSingleAcademicDepartment: builder.query({
      query: (id: string) => ({
        url: `/academic-departments/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateAcademicDepartmentMutation,
  useGetAcademicDepartmentQuery,
  useGetSingleAcademicDepartmentQuery,
} = academicDepartmentApi;
