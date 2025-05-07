export type Courses = {
  id: number | null;
  name: string;
};

export type GetCoursesSuccessResponse = {
  status: true;
  message: string;
  data: Courses[];
};

export type CourseDetail = {
  id: number;
  name: string;
  state_id: number;
  lat: string;
  lng: string;
  line_1: string;
  line_2: string;
  timezone: string;
};

export type GetCoursesDetailSuccessResponse = {
  status: true;
  message: string;
  data: CourseDetail;
};
