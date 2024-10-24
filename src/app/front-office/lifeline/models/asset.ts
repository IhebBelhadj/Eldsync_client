import { Observable } from "rxjs";

export interface Asset {
  assetId: string;
  fileName: string;
  fileType: string;
  filePath: string;
  accessLink: string;
  content$: Observable<any>;
  imageContent: string;
}
