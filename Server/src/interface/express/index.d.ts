
declare namespace Express {
  interface Request {
    /**
     * Locals posee los sig. campos:
     * @field usrId: string;
     * @field usrToken: string;
     * @field info: any;
     * @field result: any;
     * @field finished: boolean
    */
    locals: {
      usrId: string;
      usrToken: string;
      filterText: string;
      page: number;
      info: any;
      result: any;
      finished: boolean;
      notLogs: boolean
    };

    files: any;
  }
}