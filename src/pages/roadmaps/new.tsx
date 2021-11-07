import Layout from "@/components/common/Layout";
import RoadMapForm from "@/components/RoadMapForm";
import { FormProps } from "@/components/RoadMapForm/RoadMapForm";
import React, { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

interface Form {
  id: number;
}

const CreateRoadmapPage: React.VFC = () => {
  const { register, handleSubmit, control } = useForm<FormProps>({
    defaultValues: {
      roadmaps: [{ id: 1, title: "", url: "", explain: "" }],
    },
  });
  // https://react-hook-form.com/api/usefieldarray
  const { fields, append, remove } = useFieldArray({
    name: "roadmaps",
    control,
  });
  const onSubmit: SubmitHandler<FormProps> = (data) => console.log(data);
  const canRemoveForm = fields.length >= 2;

  return (
    <Layout>
      <main className="bg-gray-100 border-b py-8">
        <h1 className="text-2xl font-bold mb-4 text-center">
          ロードマップ作成
        </h1>
        <form className="container mx-auto">
          {fields.map((field, index) => (
            <RoadMapForm
              id={field.id}
              index={index}
              key={field.id}
              register={register}
              canRemoveForm={canRemoveForm}
              remove={remove}
            />
          ))}
        </form>
        <div className="text-center mt-7">
          <button
            type="button"
            className="bg-white shadow w-4/5 px-4 py-2 rounded-lg focus:outline-none"
            onClick={() =>
              append({
                id: fields[fields.length - 1].id + 1,
                title: "",
                url: "",
                explain: "",
              })
            }
          >
            ロードマップを追加する +
          </button>
        </div>
        <div className="text-right mt-7">
          <button
            className="ml-8 whitespace-nowrap inline-flex items-center justify-center mr-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            onClick={handleSubmit(onSubmit)}
          >
            作成する
          </button>
        </div>
      </main>
    </Layout>
  );
};

export default CreateRoadmapPage;
