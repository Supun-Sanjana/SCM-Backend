import Student from "./student.model";

interface StudentSchema {
  studentNo: string;
  firstName: string;
  lastname: string;
  grade: string;
  whatsappNumber: string;
  parentContactNumber: string;
}

export const createStudentService = async (
  data: StudentSchema,
  gradeId: string,
) => {
  try {
    const res = await Student.create({
      firstName: data.firstName,
      lastName: data.lastname,
      whatsappNumber: data.whatsappNumber,
      parentContactNumber: data.parentContactNumber,
      grade: gradeId,
    });

    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllStudentsService = async () => {
  try {
    const students = await Student.find();
    return students;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getStudentByIdService = async (studentId: string | string[]) => {
  try {
    const student = await Student.findById(studentId).populate({
      path: "grade", // first populate the grade
      populate: {
        path: "centerId", // then populate the center inside grade
        model: "Center", // specify the model explicitly
      },
    });

    return student;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateStudentService = async (studentId: string | string[], studentData: Partial<StudentSchema>) => {
  const updatedStudent = await Student.findByIdAndUpdate(
    studentId,
    studentData,
    { returnDocument: 'after' }
  ).populate({
    path: "grade",
    populate: { path: "centerId", model: "Center" },
  });
  return updatedStudent;
};

export const deleteStudentService = async (studentId: string | string[]) => {
  const deletedStudent = await Student.findByIdAndDelete(studentId);
  return deletedStudent;
};
