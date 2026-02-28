import Center from "./center.model";

interface CenterData {
  centerName: string;
  centerLocation: string;
}

// create center
export const createCenterService = async (data: CenterData) => {
  try {
    const res = await Center.create({
      centerName: data.centerName,
      centerLocation: data.centerLocation,
    });
    return res;
  } catch (error: any) {
    throw new Error(error);
  }
};

// get all centers
export const getAllCentersService = async () => {
  try {
    const centers = await Center.find().populate("grades");
    return centers;
  } catch (error: any) {
    throw new Error(error);
  }
};

// get center by id
export const getCenterByIdService = async (centerId: string) => {
  try {
    const center = await Center.findById(centerId).populate("grades");
    if (!center) throw new Error("CENTER_NOT_FOUND");
    return center;
  } catch (error: any) {
    throw new Error(error);
  }
};

// update center by id
export const updateCenterService = async (
  centerId: string,
  data: Partial<CenterData>
) => {
  try {
    const updated = await Center.findByIdAndUpdate(centerId, data, {
      new: true,
    });
    if (!updated) throw new Error("CENTER_NOT_FOUND");
    return updated;
  } catch (error: any) {
    throw new Error(error);
  }
};

// delete center by id
export const deleteCenterService = async (centerId: string) => {
  try {
    const deleted = await Center.findByIdAndDelete(centerId);
    if (!deleted) throw new Error("CENTER_NOT_FOUND");
    return deleted;
  } catch (error: any) {
    throw new Error(error);
  }
};
