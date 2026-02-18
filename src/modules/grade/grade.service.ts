import Grade from "./grade.model";

//create center
interface Grade {
  grade: string;
  fee: number;
  schedule: Date[];
  available: boolean;
  students: string[];
}
export const createGradeService = async (centerId: string, data: Grade) => {
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
  } catch (error:any) {
    throw new Error(error);
  }
};

//get grade by center
export const getGradesByCenterService =async(centerId:string | string[])=>{
  try {
    const grades = await Grade.find({centerId})
    return grades;
  } catch (error:any) {
    throw new Error(error);
  }
}