import { ImgRef } from "../commons";

export interface Chopp {
  id: string;
  name: string;
  description: string;
  qty: number;
  price: number;
  img: ImgRef;
}
