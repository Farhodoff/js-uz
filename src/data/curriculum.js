import { variables } from "./lessons/beginner/variables";
import { functions } from "./lessons/beginner/functions";
import { arrays } from "./lessons/beginner/arrays";

import { destructuring } from "./lessons/intermediate/destructuring";
import { spreadRest } from "./lessons/intermediate/spreadRest";

import { promises } from "./lessons/advanced/promises";
import { asyncAwait } from "./lessons/advanced/asyncAwait";

import { todoList } from "./lessons/projects/todoList";

export const curriculum = {
  beginner: {
    label: "Boshlang'ich", color: "#c8a96e", icon: "🟢",
    lessons: [variables, functions, arrays]
  },
  intermediate: {
    label: "O'rta daraja", color: "#e5b84f", icon: "🟡",
    lessons: [destructuring, spreadRest]
  },
  advanced: {
    label: "Advanced", color: "#e07b5a", icon: "🔴",
    lessons: [promises, asyncAwait]
  },
  projects: {
    label: "Loyihalar", color: "#7a9e7e", icon: "🏗️",
    lessons: [todoList]
  }
};

export const SECTIONS = ["beginner", "intermediate", "advanced", "projects"];
