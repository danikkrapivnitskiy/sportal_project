import { test } from '@playwright/test';

/**
 * Decorator that wraps a step method with a Playwright test step.
 * Used for reporting purposes.
 *
 * @example
 ```
    import { step } from './step_decorator';
    class MyTestClass {
        @step('optional step name')
        async myTestFunction(): Promise<void> {
            // Test code goes here
        }
    }
 ```
 */
export function logStep<This, Args extends unknown[], Return>(message?: string): (
  target: (this: This, ...args: Args) => Promise<Return>,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Promise<Return>>
) => (this: This, ...args: Args) => Promise<Return> {
  return function actualDecorator(
    target: (this: This, ...args: Args) => Promise<Return>,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Promise<Return>>
  ): (this: This, ...args: Args) => Promise<Return> {
    function replacementMethod(this: This, ...args: Args): Promise<Return> {
      const name = message ?? `${(this as unknown as { constructor: { name: string } }).constructor.name}.${context.name as string}`;
      return test.step(name, async () => target.call(this, ...args), { box: false });
    }
    return replacementMethod;
  };
}
