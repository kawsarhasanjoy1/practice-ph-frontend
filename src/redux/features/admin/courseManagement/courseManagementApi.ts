import baseApi from "../../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semester"],
    }),
    getSemesterRegistration: builder.query({
      query: () => ({
        url: "/semester-registrations",
        method: "GET",
      }),
      providesTags: ["semester"],
    }),
    updateSemesterRegistrationStatus: builder.mutation({
      query: (args) => ({
        url: `/semester-registrations/${args?.id}`,
        method: "PATCH",
        body: args?.data,
      }),
      invalidatesTags: ["semester"],
    }),
    createCourses: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["course"],
    }),
     getCourse: builder.query({
      query: () => ({
        url: "/courses",
        method: "GET",
      }),
      providesTags: ["course"],
    }),
  }),
});

export const {
  useCreateSemesterRegistrationMutation,
  useGetSemesterRegistrationQuery,
  useUpdateSemesterRegistrationStatusMutation,
  useCreateCoursesMutation,
  useGetCourseQuery
} = courseManagementApi;
