import {
    Mesh,
    AdditiveBlending,
    MeshBasicMaterial,
    MeshStandardMaterial,
  } from "three";
  
  import { Planet } from "./planet";
  
  export class Moon extends Planet {
    constructor(props) {
      super(props);
    }
  }
  