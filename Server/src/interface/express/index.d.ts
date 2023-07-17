
declare namespace Express {
  interface Request {
    /**
     * Locals posee los sig. campos:
     * @field usrId: string;
     * @field usrToken: string;
     * @field usrRoles: IRol[];
     * @field mockmode: string;
     * @field info: any;
     * @field result: any;
     * @field finished: boolean
    */
    locals: {
      usrId: string;
      usrToken: string;
      usrRoles: {
        name: string;
        id: string; 
      }[];
      mockmode: string;
      filterText: string;
      page: number;
      info: any;
      result: any;
      finished: boolean;
    };
  }
}