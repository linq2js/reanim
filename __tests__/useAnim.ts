import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-test-renderer";
import getTime from "../src/lib/getTime";
import { useAnim } from "../src/lib/useAnim";

test("useAnim with simple actions", async () => {
  const callback = jest.fn();
  const { result } = renderHook(() => {
    const [className, actions] = useAnim(
      { remove: (value: number) => callback(value) },
      "fadeIn"
    );

    return {
      className,
      actions,
    };
  });

  expect(result.current.className).toBe("");

  act(() => {
    result.current.actions.remove(1);
  });
  const time = getTime();
  await delay(time);
  expect(result.current.className.trim()).toBe(
    "animate__animated animate__fadeIn"
  );
  expect(callback).toBeCalledWith(1);
});

test("useAnim with custom animation", async () => {
  const callback = jest.fn();
  const customAnimation = { class: () => "custom-class", run: callback };
  const { result } = renderHook(() => {
    const [className, actions] = useAnim(
      { remove: (value: number) => {} },
      customAnimation
    );
    return {
      className,
      actions,
    };
  });
  act(() => {
    result.current.actions.remove(1);
  });
  const time = getTime();
  await delay(time);
  expect(callback).toBeCalledTimes(1);
  expect(result.current.className.trim()).toBe(
    "animate__animated custom-class"
  );
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
