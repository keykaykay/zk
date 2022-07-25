#!/usr/bin/env node
import prompts from "prompts";
import { fileURLToPath } from "url";
import { $, path, fs, argv, chalk } from "zx";

async function run() {
  const pkg = await JSON.parse(
    (
      await fs.readFile(
        path.resolve(fileURLToPath(import.meta.url), "..", "package.json"),
        "utf-8"
      )
    ).toString()
  );

  if (argv["v"] || argv["V"] || argv["version"]) {
    console.log(`v${pkg.version}`);
    return;
  }
  if (argv["help"]) {
    console.log(`
  Usage:

  Commands:
  zk                    Create vue3 and Node projects
  zk -v -V --version    Display the current version
  zk --help             Display help information
  
  v${pkg.version}
    `);
    return;
  }
  try {
    const response = await prompts([
      {
        type: "text",
        name: "name",
        message: `请输入项目名`,
        validate: (val) =>
          String(val).trim().replace(/\/+$/g, "") ? true : false,
      },
      {
        type: "select",
        name: "address",
        message: "请选择模板",
        choices: [
          {
            title: "vue3",
            value: "vue3-template",
          },
          {
            title: "node",
            value: "node-template",
          },
        ],
      },
    ]);
    const cwd = process.cwd();
    const targetPath = path.join(cwd, response.name);
    const templateDir = path.resolve(
      fileURLToPath(import.meta.url),
      "..",
      `zkme-${response.address}`
    );
    await fs.copy(templateDir, targetPath);
    const pkgPath = path.join(targetPath, "package.json");
    const pkg = await JSON.parse(
      (await fs.readFile(pkgPath, "utf-8")).toString()
    );
    pkg.name = response.name;
    await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2));
  } catch (error) {
    console.log(chalk.bgRed.bold(error));
  }
}

run();
