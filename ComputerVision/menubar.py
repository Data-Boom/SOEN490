import settings
import homepage
import cannyVariables
import tkinter as tk
from tkinter import Menu

def new_picture () :
    if len(settings.frames) > 0 :
        for frames in settings.frames :
            settings.frames[frames].destroy()
        
        settings.resetglobals()
        menubar()
        homepage.start()

def menubar () :
    settings.menubar = tk.Menu(settings.m)
    settings.filemenu = tk.Menu(settings.menubar, tearoff=0)
    settings.filemenu.add_command(label="New Picture", command=new_picture)

    settings.menubar.add_cascade(label="Menu", menu=settings.filemenu)

    settings.m.configure(menu=settings.menubar)

