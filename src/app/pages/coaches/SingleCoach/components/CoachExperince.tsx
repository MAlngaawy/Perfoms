import React from "react";
import AppIcons from "@main/core/AppIcons";

type Props = {
  experinces: {
    start: string;
    end: string;
    title: string;
    works: string[];
  }[];
  qualifications: string[];
  courses: string[];
};

const CoachExperince = (props: Props) => {
  return (
    <div className="bg-white flex flex-col sm:flex-row gap-8 h-full rounded-lg md:rounded-2xl p-4  pt-10">
      <div className="experinces">
        <TitleWithIcon name="Experinces" />
        {props.experinces.map((oneExp) => (
          <div className="flex flex-col ml-2 my-4">
            <p className="text-xs font-normal text-perfGray3">
              {oneExp.start} - {oneExp.end}
            </p>
            <h3 className="text-base font-semibold text-perfGray1">
              {oneExp.title}
            </h3>
            <ul className="list-disc list-outside ml-8">
              {oneExp.works.map((work) => (
                <li className="text-xs font-normal text-perfGray3  my-1">
                  {work}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-6">
        <div className="qualifications">
          <TitleWithIcon name="Core Qualifications" />
          <ul className="list-disc list-outside  ml-8">
            {props.qualifications.map((oneQualifications) => (
              <li
                key={oneQualifications}
                className="text-xs font-normal text-perfGray3 my-1"
              >
                {oneQualifications}
              </li>
            ))}
          </ul>
        </div>
        <div className="courses">
          <TitleWithIcon name="Courses" />

          <ul className="list-disc list-outside ml-8">
            {props.courses.map((course) => (
              <li className="text-xs font-normal text-perfGray3 my-1">
                {course}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CoachExperince;

const TitleWithIcon = ({ name }: { name: string }) => {
  return (
    <div className="flex gap-2 items-center mb-6">
      <div className="icon bg-perfBlue p-1 rounded-full">
        <AppIcons className="w-5 h-5 text-white" icon="BriefcaseIcon:solid" />
        {/* <AppIcons icon="Briefcase:solid" /> */}
      </div>
      <div className="title">
        <h2>{name}</h2>
      </div>
    </div>
  );
};
