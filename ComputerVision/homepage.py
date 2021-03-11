from tkinter import messagebox
import os.path
from os import path
import tkinter as tk
import settings
import cannyVariables

def next () :
    if  os.path.isfile(settings.inputs["imagepath"].get()) and settings.inputs["imagelength"].get().isnumeric() :
        settings.imagepath = settings.inputs["imagepath"].get()
        settings.imagelength = float(settings.inputs["imagelength"].get())
        settings.frames["homepage"].destroy()
        cannyVariables.start_canny()
    elif settings.inputs["imagepath"].get() != "" and not os.path.isfile(settings.inputs["imagepath"].get()):
        messagebox.showerror( "Error", "Path does not exist.")
    elif settings.inputs["imagelength"].get() != "" and not settings.inputs["imagelength"].get().isnumeric():
        messagebox.showerror( "Error", "Length must be a number.")
    else:
        messagebox.showerror( "Error", "Both filepath and length are required.")

def start () :
    
    settings.m.title('Cell Size Analysis')
    settings.m.configure(bg='white')

    screen_width = settings.m.winfo_screenwidth()
    screen_height = settings.m.winfo_screenheight()
    print(screen_height, screen_width)
    homepage = tk.Frame(master=settings.m, background="white", height=screen_height, width=screen_width)
    settings.frames["homepage"] = homepage

    settings.frames["homepage"].grid(row=0, column=0, sticky="n")
    

    tk.Label(master=settings.frames["homepage"], padx=100, text="Cell Size Analysis Tool", font="Helvetica 64 bold", background="white").grid(row=0, columnspan=4)

    tk.Label(master=settings.frames["homepage"], padx=100, text="To start an analysis, enter the full path of the image and the top to bottom length of the image.", font="Helvetica 16", background="white").grid(row=1, columnspan=4)

    tk.Label(master=settings.frames["homepage"], text="Imagepath: ", background="white").grid(row=3, column=1, sticky="e")
    tk.Label(master=settings.frames["homepage"], text="Length of Image", background="white").grid(row=4, column=1, sticky="e")

    imagepath = tk.Entry(master=settings.frames["homepage"])
    imagelength = tk.Entry(master=settings.frames["homepage"])
    
    settings.inputs["imagepath"] = imagepath
    settings.inputs["imagelength"] = imagelength

    settings.inputs["imagepath"].grid(row=3, column=2, sticky="w")
    settings.inputs["imagelength"].grid(row=4, column=2, sticky="w")

    submit = tk.Button(master=settings.frames["homepage"], text="Start", command=next, width=30, height=2, background="white")
    settings.buttons["submit"] = submit

    settings.buttons["submit"].grid(row=5, column=1, columnspan=2, padx=30, pady=30)

    tk.mainloop ()
    