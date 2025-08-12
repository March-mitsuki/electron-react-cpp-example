import fs from "fs";

const PREFIX = "[rmx]";

function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error(`${PREFIX} No directory specified.`);
    process.exit(1);
  }

  for (const dir of args) {
    console.log(`${PREFIX} Removing directory... (${dir})`);
    fs.rmSync(dir, { recursive: true, force: true });
  }

  console.log(`${PREFIX} All done.`);
}

main();
