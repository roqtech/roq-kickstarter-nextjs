export interface UserFile {
  id: string;
  name: string;
  size: string;
  contentType: string;
  createdByUserId: string;
  createdAt: Date;
  updatedAt: Date;
  url: string;
}

export interface FilesFetchResponse {
  files: { data: UserFile[]; totalCount: number };
}

export interface FilesFetchRequest {
  limit?: number;
  offset?: number;
}
