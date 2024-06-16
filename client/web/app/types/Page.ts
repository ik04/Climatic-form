type FormField = {
  field: string;
  type: string;
  options?: string[] | number[];
};

type FormPage = {
  fields: FormField[];
  is_last: boolean;
};

type FormsType = {
  [key: number]: FormPage;
};

type FormBuilderProps = {
  page: FormPage;
  title: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};
