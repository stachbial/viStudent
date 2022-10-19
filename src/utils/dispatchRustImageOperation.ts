import { imageActionParams } from "../types/ImageProcessingContextTypes";
import { invoke } from "@tauri-apps/api/tauri";

export const dispatchRustImageOperation = async (
  actionParams: imageActionParams
): Promise<string> => {
  switch (actionParams.type) {
    case "load_image":
      const img = actionParams?.payload?.img.toString();
      return (await invoke(actionParams.type, { img: img })) as string;
    default:
      return null;
  }
};
