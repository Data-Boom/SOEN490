import cv2 as cv
import numpy as np
import math

global img
global pointarray
global cellid
global cellsizeidarray
global imagelength
global previousImg

def cellpnginput (imgsrc, length) :
    global img, pointarray, cellid, cellsizeidarray, imagelength, previousImg
    
    imagelength = length
    cellid = 1
    pointarray = []
    cellsizeidarray = []
    img = cv.imread(imgsrc,0)
    previousImg = []
    cv.namedWindow('image')
    cv.setMouseCallback('image',draw_circle)

    while(1):
        cv.imshow('image',img)
        cv.imwrite("old.png", img)
        k = cv.waitKey(2) & 0xFF
        if k == 27:
            break
        # Print current cell sizes and corresponding IDs
        elif k == ord('a'):
            print (cellsizeidarray)
        # Remove last drawn point or line
        elif k == ord('b'):
            if len(previousImg) != 0 :
                if previousImg[len(previousImg)-1][1] == "circle" :
                    pointarray.pop()
                elif previousImg[len(previousImg)-1][1] == "line" :
                    cellid -= 1
                    cellsizeidarray.pop()
                    pointarray[len(pointarray)-2][2] = True
                img = np.array(previousImg[len(previousImg)-1][0])
                previousImg.pop()
        # Draw and compute current line between last two points
        elif k == ord('c'):
            if len(pointarray) > 1 :
                if pointarray[len(pointarray)-2][2] :
                    pointarray[len(pointarray)-2][2] = False
                    x1 = pointarray[len(pointarray)-1][0]
                    y1 = pointarray[len(pointarray)-1][1]
                    x2 = pointarray[len(pointarray)-2][0]
                    y2 = pointarray[len(pointarray)-2][1]
                    previousImg.append([img.copy(),"line"])
                    cv.line(img, (x1,y1), (x2,y2), (0, 255, 0), 2)
                    cv.putText(img, str(cellid), (x1,y1), cv.FONT_HERSHEY_COMPLEX_SMALL, 2, (0, 255, 0), 2, cv.LINE_AA)
                    calculate(x1,x2,y1,y2)
                    cellid += 1
                else :
                    print("There is already a line here.")
            else :
                print("You need 2 points to create a calculation")

def calculate(x1,x2,y1,y2) :
    global cellid, imagelength, cellsizeidarray
    x,y = img.shape
    inpixels = math.sqrt(math.pow(x1-x2,2)+math.pow(y1-y2,2))
    distance = (imagelength * inpixels) / x
    cellsizeidarray.append([cellid, distance])

def draw_circle(event,x,y,flags,param):
    global mouseX,mouseY, img, pointarray, previousImg
    if event == cv.EVENT_LBUTTONDBLCLK:
        previousImg.append([img.copy(),"circle"])
        cv.circle(img,(x,y),5,(0,255,0),-1)
        mouseX,mouseY = x,y
        pointarray.append([mouseX,mouseY,True])

# Set path of image to be drawn
cellpnginput("E:/repos/SOEN490/Computer Vision/fig-3-4c.ppm", 80)