export default function plop(
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  //create your generators here

  plop.setGenerator("create-feature", {
    description: "Creates Backend Feature",
    prompts: [
      {
        type: "input",
        name: "name",
        message:
          "This will create file for route, controller, service, schema and test",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/features/{{name}}/{{name}}.test.ts",
        templateFile: ".plop-templates/feature.test.hbs",
      },
      {
        type: "add",
        path: "src/features/{{name}}/{{name}}.route.ts",
        templateFile: ".plop-templates/feature.route.hbs",
      },
      {
        type: "add",
        path: "src/features/{{name}}/{{name}}.controller.ts",
        templateFile: ".plop-templates/feature.controller.hbs",
      },
      {
        type: "add",
        path: "src/features/{{name}}/{{name}}.service.ts",
        templateFile: ".plop-templates/feature.service.hbs",
      },
      {
        type: "add",
        path: "src/features/{{name}}/{{name}}.schema.ts",
        templateFile: ".plop-templates/feature.schema.hbs",
      },
    ],
  });
}
