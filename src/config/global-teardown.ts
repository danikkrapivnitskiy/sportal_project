export default async function globalTeardown(): Promise<void> {
  process.stdout.write('Teardown complete\n');
}
