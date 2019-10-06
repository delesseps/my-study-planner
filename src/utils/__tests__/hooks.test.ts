import { renderHook, act } from '@testing-library/react-hooks'
import { useToggle } from "utils/hooks";

describe("useToggle", () => {
    it("can toggle", () => {
        const { result } = renderHook(() => useToggle());

        expect(result.current.toggled).toBeFalsy();
        act(() => result.current.toggle());
        expect(result.current.toggled).toBeTruthy();
    })
})