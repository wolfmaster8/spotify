import { ReactNode } from "react";
import SelectButton from "./components/SelectButton";

const General = ({ children }: { children: ReactNode }) => <>{children}</>;

General.SelectButton = SelectButton;

export default General;
