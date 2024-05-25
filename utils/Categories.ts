import { AiFillPhone } from "react-icons/ai";
import {
  MdStorefront,
  MdOutlineHomeWork,
  MdLaptopChromebook,
  MdWifiTetheringError,
} from "react-icons/md";

import { GiLipstick } from "react-icons/gi";
import { GiDelicatePerfume } from "react-icons/gi";
import { MdWatch } from "react-icons/md";
import { BsFillHandbagFill } from "react-icons/bs";
import { FaGifts } from "react-icons/fa";

export const Categories = [
  {
    label: "All",
    icon: MdStorefront,
  },
  {
    label: "Perfumes",
    icon: GiDelicatePerfume,
  },
  {
    label: "Skin Care",
    icon: GiLipstick,
  },
  {
    label: "Watches",
    icon: MdWatch,
  },
  {
    label: "Hanbags",
    icon: BsFillHandbagFill,
  },
  {
    label: "GiftSets",
    icon: FaGifts,
  },

  {
    label: "Other",
    icon: MdWifiTetheringError,
  },
];
