#this initializes all the global variables needed throughout the files
import tkinter as tk

def init ():

    #the main window
    global m
    m = tk.Tk()

    global frames
    frames = {}

    global images
    images = {}
    global imagelabels
    imagelabels = {}
    
    global imagepath
    global imagelength
    
    global buttons
    buttons = {}
    
    global inputs
    inputs = {}
    
    global thresholdVariables
    thresholdVariables = {}

    global sliders
    sliders = {}