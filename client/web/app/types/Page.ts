type FormField = {
  field: string;
  type: string;
  options?: string[] | number[];
};

type FormPage = {
  fields: FormField[];
  is_last: boolean;
  title: string;
};

type FormsType = {
  [key: number]: FormPage;
};

type FormBuilderProps = {
  count: number;
  page: FormPage;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

interface FormDataState {
  [key: number]: { [key: string]: any };
}
