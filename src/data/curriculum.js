import { jsWhat } from "./lessons/beginner/js-what";
import { variables } from "./lessons/beginner/variables";
import { operators } from "./lessons/beginner/operators";
import { loops } from "./lessons/beginner/loops";
import { functions } from "./lessons/beginner/functions";
import { arrays } from "./lessons/beginner/arrays";
import { objects } from "./lessons/beginner/objects";

import { destructuring } from "./lessons/intermediate/destructuring";
import { spreadRest } from "./lessons/intermediate/spreadRest";
import { arrowFunctions } from "./lessons/intermediate/arrowFunctions";
import { domBasics } from "./lessons/intermediate/dom";
import { events } from "./lessons/intermediate/events";

import { promises } from "./lessons/advanced/promises";
import { asyncAwait } from "./lessons/advanced/asyncAwait";
import { fetchApi } from "./lessons/advanced/fetch";
import { localStorageLesson } from "./lessons/advanced/localStorage";
import { errorHandling } from "./lessons/advanced/errorHandling";
import { modulesLesson } from "./lessons/advanced/modules";
import { debugging } from "./lessons/advanced/debugging";

import { todoList } from "./lessons/projects/todoList";

export const curriculum = {
  beginner: {
    label: "Boshlang'ich",
    color: "#c8a96e",
    icon: "🟢",
    lessons: [jsWhat, variables, operators, loops, functions, arrays, objects]
  },
  intermediate: {
    label: "O'rta daraja",
    color: "#e5b84f",
    icon: "🟡",
    lessons: [destructuring, spreadRest, arrowFunctions, domBasics, events]
  },
  advanced: {
    label: "Advanced",
    color: "#e07b5a",
    icon: "🔴",
    lessons: [promises, asyncAwait, fetchApi, localStorageLesson, errorHandling, modulesLesson, debugging]
  },
  projects: {
    label: "Loyihalar",
    color: "#7a9e7e",
    icon: "🏗️",
    lessons: [todoList]
  }
};

export const SECTIONS = ["beginner", "intermediate", "advanced", "projects"];
