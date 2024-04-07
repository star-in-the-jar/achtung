import Xlib
import Xlib.display
from Xlib import display
import os
import time
import json
from subprocess import PIPE, Popen

def read_x_window_data(id_):
    id_w = Popen(['xprop', '-id', id_], stdout=PIPE)

    for j in id_w.stdout:
        # if b'WM_ICON_NAME(STRING)' in j and b'=' in j:
        #     j = j.decode('ascii')
        #     parts = j.split("=")
        #     parts = parts[1:]
        #     title = "".join(parts).strip()
        #     if title:
        #         return title
        if b'WM_CLASS(STRING)' in j and b'=' in j:
            j = j.decode('ascii')
            parts = j.split("=")
            parts = parts[1:]
            parts = "".join(parts).strip()
            clz, name = json.loads(f"[{parts}]")
            return name
    return None

def read_list():
    title = ''
    root_check = ''
    
    root = Popen(['xprop', '-root'],  stdout=PIPE)

    if root.stdout != root_check:
        root_check = root.stdout

        for i in root.stdout:
            if b'_NET_CLIENT_LIST(WINDOW):' in i:
                i = i.decode('ascii').strip()
                ids = i.split("window id #")[1].strip()
                ids = ids.split(",")
                ids = [s.strip() for s in ids]
                return [
                    read_x_window_data(s) for s in ids
                ]
                
    return None


def read_focus():
    title = ''
    root_check = ''
    
    root = Popen(['xprop', '-root'],  stdout=PIPE)

    if root.stdout != root_check:
        root_check = root.stdout

        for i in root.stdout:
            if b'_NET_ACTIVE_WINDOW(WINDOW):' in i:
                i = i.decode('ascii').strip()
                id_ = i.split("window id #")[1].strip()
                if id_ == "0x0":
                    return None
                return read_x_window_data(id_)
                
    return None

def read_all():
    window_names = read_list()
    focus = read_focus() 

    return focus, window_names



while True:
    try:
        focus, names = read_all()
    except Exception as e:
        print(e)
        raise
    with open("data/windows.json", "wt") as f:
        f.write(json.dumps({
            "focusedWindow": focus,
            "windows": names
        }, indent=2))
    time.sleep(.1)
