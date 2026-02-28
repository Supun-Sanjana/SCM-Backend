import Grade from "./grade.model";

interface GradeData {
  grade: string;
  fee: number;
  schedule: Date[];
  available: boolean;
  students: string[];
}

// create grade
export const createGradeService = async (centerId: string, data: GradeData) => {
  try {
    const res = await Grade.create({
      centerId: centerId,
      available: data.available,
      fee: data.fee,
      grade: data.grade,
      schedule: data.schedule,
      students: data.students,
    });
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

// get grades by center
export const getGradesByCenterService = async (
  centerId: string | string[]
) => {
  try {
    const grades = await Grade.find({ centerId }).populate("students");
    return grades;
  } catch (error: any) {
    throw new Error(error);
  }
};

// get grade by id
export const getGradeByIdService = async (gradeId: string) => {
  try {
    const grade = await Grade.findById(gradeId)
      .populate("students")
      .populate("centerId");
    if (!grade) throw new Error("GRADE_NOT_FOUND");
    return grade;
  } catch (error: any) {
    throw new Error(error);
  }
};

// update grade by id
export const updateGradeService = async (
  gradeId: string,
  data: Partial<GradeData>
) => {
  try {
    const updated = await Grade.findByIdAndUpdate(gradeId, data, { new: true });
    if (!updated) throw new Error("GRADE_NOT_FOUND");
    return updated;
  } catch (error: any) {
    throw new Error(error);
  }
};

// delete grade by id
export const deleteGradeService = async (gradeId: string) => {
  try {
    const deleted = await Grade.findByIdAndDelete(gradeId);
    if (!deleted) throw new Error("GRADE_NOT_FOUND");
    return deleted;
  } catch (error: any) {
    throw new Error(error);
  }
};