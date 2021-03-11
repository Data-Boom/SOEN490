import tkinter as tk
from tkinter import messagebox, simpledialog
import settings
import menubar
import cv2
import math
import os.path
import numpy as np
from os import path
from PIL import Image, ImageTk

def preview () :
    message = ""
    for allpoints in settings.cellsizeidarray :
        message += " ID: " + str(allpoints[0]) + " \t Distance: " + str(allpoints[1]) + " \n\n"
    messagebox.showinfo("Measurements", message)

def download () :
    message = ""
    user_input = simpledialog.askstring(title="Download", prompt="Enter file name:")
    while True :
        if os.path.isfile(user_input + ".txt") or os.path.isfile(user_input + ".png"):
            user_input = simpledialog.askstring(title="Download", prompt="File \"" + user_input + ".txt\' already exists, enter new file name:")
        else :
            try :
                f = open(user_input + ".txt", "w")
                break
            except OSError:
                user_input = simpledialog.askstring(title="Download", prompt="File \"" + user_input + ".txt\' is an invalid file name, enter new file name:")

    f.write("ID#, Cell Width\n")
    for allpoints in settings.cellsizeidarray :
        message += str(allpoints[0]) + ", " +str(allpoints[1]) + "\n"
    f.write(message)
    cv2.imwrite(user_input + ".png", settings.images["imagetomeasure"])
    f.close()
    messagebox.showinfo("Success", "Successfully downloaded.")

def undo () :
    if len(settings.previousImgs) != 0 :
        if settings.previousImgs[len(settings.previousImgs)-1][1] == "circle" :
            settings.points.pop()
        elif settings.previousImgs[len(settings.previousImgs)-1][1] == "line" :
            settings.variables['cellid'] -= 1
            settings.cellsizeidarray.pop()
            settings.points[len(settings.points)-2][2] = True
        settings.images["imagetomeasure"] = np.array(settings.previousImgs[len(settings.previousImgs)-1][0])
        settings.previousImgs.pop()
        settings.previousImgsWithoutIDs.pop()
        change_image()
    else :
        messagebox.showerror( "Error", "There is nothing to undo.")

def hide_ids () :
    if settings.hideids :
        settings.buttons['hideIDsButton'].configure(text="Hide IDs")
    else :
        settings.buttons['hideIDsButton'].configure(text="Unhide IDs")
    settings.hideids = not settings.hideids
    change_image()
        
def change_image () :
    if settings.hideids :
        img = Image.fromarray(settings.previousImgsWithoutIDs[len(settings.previousImgsWithoutIDs)-1][0])
        img = ImageTk.PhotoImage(image = img)
        settings.imagelabels["measurementimage"].configure(image=img)
        settings.imagelabels["measurementimage"].image = img
        settings.images["measurementimage"] = img
    else :
        img = Image.fromarray(settings.images["imagetomeasure"])
        img = ImageTk.PhotoImage(image = img)
        settings.imagelabels["measurementimage"].configure(image=img)
        settings.imagelabels["measurementimage"].image = img
        settings.images["measurementimage"] = img

def calculate_length (x1,x2,y1,y2) :
    x,y,z = settings.images["imagetomeasure"].shape
    inpixels = math.sqrt(math.pow(x1-x2,2)+math.pow(y1-y2,2))
    distance = (settings.imagelength * inpixels) / x
    settings.cellsizeidarray.append([settings.variables['cellid'], distance])

def calculate () :
    if len(settings.points) > 1 :
        if settings.points[len(settings.points)-2][2] :
            settings.points[len(settings.points)-2][2] = False
            x1 = settings.points[len(settings.points)-1][0]
            y1 = settings.points[len(settings.points)-1][1]
            x2 = settings.points[len(settings.points)-2][0]
            y2 = settings.points[len(settings.points)-2][1]
            if y2 > y1 :
                y3 = int(y2-((y2-y1)/2)-5)
            else: 
                y3 = int(y1-((y1-y2)/2)-5)
            if x2 > x1 :
                x3 = int(x2-((x2-x1)/2))
            else: 
                x3 = int(x1-((x1-x2)/2))
            settings.previousImgs.append([settings.images["imagetomeasure"].copy(),"line"])
            settings.images["imagetomeasure"] = cv2.line(settings.images["imagetomeasure"], (x1,y1), (x2,y2), (255, 0, 0), 2)
            img = cv2.line(settings.previousImgsWithoutIDs[len(settings.previousImgsWithoutIDs)-1][0], (x1,y1), (x2,y2), (255, 0, 0), 2)
            settings.previousImgsWithoutIDs.append([img])

            settings.images["imagetomeasure"] = cv2.putText(settings.images["imagetomeasure"], str(settings.variables['cellid']), (x3, y3), cv2.FONT_HERSHEY_COMPLEX_SMALL, 2, (255, 0, 0), 2, cv2.LINE_AA)
            calculate_length(x1,x2,y1,y2)  
            settings.variables['cellid'] += 1
            change_image()
        else :
            messagebox.showerror( "Error", "There is already a line here.")
    else :
       messagebox.showerror( "Error", "You need 2 points to create a calculation.")

def add_measurement_buttons () :
    settings.variables['cellid'] = 1
    settings.frames['buttons'] = tk.Frame(master=settings.m, background="white")
    settings.frames['buttons'].grid(row=0, column=3, sticky="n", rowspan=5)
    settings.buttons['undoButton'] = tk.Button(master=settings.frames['buttons'], text="Undo Action", command=undo, width=30, height=2, padx=5, pady=5, background="white")
    settings.buttons['undoButton'].pack()
    settings.buttons['calculateButton'] = tk.Button(master=settings.frames['buttons'], text="Calculate", command=calculate, width=30, height=2, padx=5, pady=5, background="white")
    settings.buttons['calculateButton'].pack()
    settings.buttons['hideIDsButton'] = tk.Button(master=settings.frames['buttons'], text="Hide IDs", command=hide_ids, width=30, height=2, padx=5, pady=5, background="white")
    settings.buttons['hideIDsButton'].pack()
    settings.buttons['printButton'] = tk.Button(master=settings.frames['buttons'], text="Preview Measurements", command=preview, width=30, height=2, padx=5, pady=5, background="white")
    settings.buttons['printButton'].pack()
    settings.buttons['downloadButton'] = tk.Button(master=settings.frames['buttons'], text="Download Measurements", command=download, width=30, height=2, padx=5, pady=5, background="white")
    settings.buttons['downloadButton'].pack()

def draw_circle (x, y) :
    settings.previousImgs.append([settings.images["imagetomeasure"].copy(),"circle"])
    settings.images["imagetomeasure"] = cv2.circle(settings.images["imagetomeasure"],(x-2,y-2),5,(255,0,0),-1)
    img = cv2.circle(settings.previousImgsWithoutIDs[len(settings.previousImgsWithoutIDs)-1][0],(x-2,y-2),5,(255,0,0),-1)
    settings.previousImgsWithoutIDs.append([img])
    change_image()

    settings.points.append([x-2, y-2, True])


def getorigin(eventorigin):
    global x, y
    x = eventorigin.x
    y = eventorigin.y
    draw_circle(x, y)

def measures_with_canny () :
    screen_width = int(settings.m.winfo_screenwidth()/1.25)
    screen_height = int(settings.m.winfo_screenheight()/1.25)
    settings.images["imagetomeasure"] = cv2.resize(cv2.cvtColor(settings.images["latestCanny"],cv2.COLOR_GRAY2RGB), (screen_width, screen_height), interpolation = cv2.INTER_AREA)
    settings.previousImgsWithoutIDs.append([settings.images["imagetomeasure"].copy()])
    settings.frames["originalimage"].destroy()
    settings.imagelabels["measurementimage"] = settings.imagelabels["altered"]
    settings.imagelabels["measurementimage"].bind("<Button-1>",getorigin)

    settings.frames["sliderframe"].destroy()
    settings.frames["endCannyframe"].destroy()
    change_image()
    add_measurement_buttons()

def measures_with_original () :
    screen_width = int(settings.m.winfo_screenwidth()/1.25)
    screen_height = int(settings.m.winfo_screenheight()/1.25)
    settings.images["imagetomeasure"] = cv2.resize(cv2.cvtColor(settings.images["originalphotowithCV"],cv2.COLOR_GRAY2RGB), (screen_width, screen_height), interpolation = cv2.INTER_AREA)
    settings.previousImgsWithoutIDs.append([settings.images["imagetomeasure"].copy()])
    settings.frames["alteredimage"].destroy()
    settings.imagelabels["measurementimage"] = settings.imagelabels["original"]
    settings.imagelabels["measurementimage"].bind("<Button-1>",getorigin)

    settings.frames["sliderframe"].destroy()
    settings.frames["endCannyframe"].destroy()

    change_image()
    add_measurement_buttons()