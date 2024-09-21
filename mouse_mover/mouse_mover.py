import pyautogui
import time

def move_mouse():
    try:
        while True:
            current_mouse_x, current_mouse_y = pyautogui.position()
            # Move left
            pyautogui.moveTo(current_mouse_x - 1, current_mouse_y)
            time.sleep(10)
            # Move up
            pyautogui.moveTo(current_mouse_x - 1, current_mouse_y - 1)
            time.sleep(10)
            # Move right
            pyautogui.moveTo(current_mouse_x, current_mouse_y - 1)
            time.sleep(10)
            # Move down
            pyautogui.moveTo(current_mouse_x, current_mouse_y)
            time.sleep(30)
    except KeyboardInterrupt:
        print("Program exited.")

if __name__ == "__main__":
    move_mouse()
