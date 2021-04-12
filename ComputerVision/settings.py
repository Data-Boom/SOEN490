#this initializes all the global variables needed throughout the files
import tkinter as tk

def init ():

    #the main window
    global m
    m = tk.Tk()

    global menubar
    global filemenu

    resetglobals() 

def resetglobals () :
    
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

    global previousImgs
    previousImgs = []

    global previousImgsWithoutIDs
    previousImgsWithoutIDs = []

    global points
    points = []

    global variables
    variables = {}

    global cellsizeidarray
    cellsizeidarray = []

    global hideids
    hideids = False