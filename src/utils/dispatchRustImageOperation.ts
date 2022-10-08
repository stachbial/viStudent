import { currentImageType } from "../types/ImageProcessingContextTypes";
import { invoke } from "@tauri-apps/api/tauri";

const actions = {
  TEST: "TEST",
};

type rustRustImageOperationType = {
  type: string;
  params?: any;
};

export const dispatchRustImageOperation = async (
  currentImage: currentImageType,
  operation: rustRustImageOperationType
) => {
  switch (operation.type) {
    case "LOAD_IMAGE":
      return await invoke(operation.type, {});
    default:
      return null;
  }
};
