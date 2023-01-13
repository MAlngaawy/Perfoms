import {
  AddAttendance,
  PlayerAttendance,
  UpdateAttendance,
} from "./../types/attendance-types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_HEADERS, BASE_URL } from "~/app/configs/dataService";
import { Attendance } from "../types/attendance-types";

export const attendanceApi = createApi({
  reducerPath: "attendanceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/attendance`,
    prepareHeaders: BASE_HEADERS,
  }),
  tagTypes: ["Attendance"],
  endpoints: ({ query, mutation }) => ({
    attendance: query<Attendance, number>({
      query: (id) => `attendance-day-details/${id}/`,
      providesTags: ["Attendance"],
    }),
    playerAttendance: query<PlayerAttendance, number>({
      query: (id) => `player-attendance/${id}/`,
      providesTags: ["Attendance"],
    }),
    addAttendance: mutation<Attendance, AddAttendance>({
      query: (body) => ({
        url: "add-team-calendar/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Attendance"],
    }),
    updateAttendance: mutation<Attendance, UpdateAttendance>({
      query: ({ id, ...body }) => ({
        url: `update-attendance-day/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Attendance"],
    }),
    deleteAttendance: mutation<null, number>({
      query: (id) => ({
        url: `delete-attendance-day/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Attendance"],
    }),
  }),
});

export const {
  useAttendanceQuery,
  useDeleteAttendanceMutation,
  usePlayerAttendanceQuery,
  useUpdateAttendanceMutation,
  useAddAttendanceMutation,
} = attendanceApi;
