import { imageActionParams } from "../types/ImageProcessingContextTypes";
import { invoke } from "@tauri-apps/api/tauri";

export const dispatchRustImageOperation = async (
  actionParams: imageActionParams
): Promise<string> => {
  return (await invoke(actionParams.type, actionParams?.payload)) as string;
};
