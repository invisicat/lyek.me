import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  hint?: string;
  className?: string;
};

type InputProps = BaseProps & {
  type?: "input";
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
};

type TextareaProps = BaseProps & {
  type: "textarea";
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
};

type SelectProps = BaseProps & {
  type: "select";
  selectProps?: SelectHTMLAttributes<HTMLSelectElement>;
  children: ReactNode;
};

type Props = InputProps | TextareaProps | SelectProps;

const controlClass =
  "w-full rounded-lg border border-(--border) bg-(--bg) px-3 py-2 text-sm text-(--text) outline-none transition-all duration-200 focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/20";

export default function FormField(props: Props) {
  return (
    <label className={`flex flex-col gap-2 ${props.className ?? ""}`}>
      <span className="text-xs font-medium tracking-wide text-(--text-secondary) uppercase">{props.label}</span>
      {props.type === "textarea" ? (
        <textarea {...props.textareaProps} className={`${controlClass} ${props.textareaProps?.className ?? ""}`} />
      ) : props.type === "select" ? (
        <select {...props.selectProps} className={`${controlClass} ${props.selectProps?.className ?? ""}`}>
          {props.children}
        </select>
      ) : (
        <input
          {...props.inputProps}
          type={props.inputProps?.type ?? "text"}
          className={`${controlClass} ${props.inputProps?.className ?? ""}`}
        />
      )}
      {props.hint ? <span className="text-xs text-(--text-tertiary)">{props.hint}</span> : null}
    </label>
  );
}
