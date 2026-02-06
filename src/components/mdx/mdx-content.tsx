import * as runtime from "react/jsx-runtime";
import { Callout } from "./callout";
import { CodeBlock } from "./code-block";
import { Steps, Step } from "./steps";
import { FileTree, FileTreeFolder, FileTreeFile } from "./file-tree";
import { Demo } from "./demo";
import { Practice, PracticeItem } from "./practice";
import { KeyCombo } from "./key-combo";
import { BeforeAfter } from "./before-after";

const sharedComponents = {
  Callout,
  CodeBlock,
  Steps,
  Step,
  FileTree,
  FileTreeFolder,
  FileTreeFile,
  Demo,
  Practice,
  PracticeItem,
  KeyCombo,
  BeforeAfter,
};

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXContentProps {
  code: string;
}

export function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);
  return (
    <div className="prose max-w-none">
      <Component components={sharedComponents} />
    </div>
  );
}
