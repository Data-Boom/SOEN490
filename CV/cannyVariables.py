from libraries import *
import settings

def change_sigma (sigma) :
    settings.thresholdVariables["currentsigma"] = float(sigma)
    gausimg = cv2.GaussianBlur(settings.images["originalphotowithCV"], (5,5), settings.thresholdVariables["currentsigma"])
    edges = cv2.Canny(gausimg, settings.thresholdVariables["currentlt"], settings.thresholdVariables["currentht"])
    edges = Image.fromarray(edges)
    edges = ImageTk.PhotoImage(image = edges)
    settings.imagelabels["altered"].configure(image=edges)
    settings.imagelabels["altered"].image = edges
    settings.images["edges"] = edges

def change_low_threshold (lt) :
    settings.thresholdVariables["currentlt"] = int(lt)
    if settings.thresholdVariables["currentlt"] >= settings.thresholdVariables["currentht"] :
        settings.thresholdVariables["currentht"] = settings.thresholdVariables["currentlt"] + 1
        settings.sliders["highthresholdslider"].set(settings.thresholdVariables["currentht"])
    gausimg = cv2.GaussianBlur(settings.images["originalphotowithCV"], (5,5), settings.thresholdVariables["currentsigma"])
    edges = cv2.Canny(gausimg, settings.thresholdVariables["currentlt"], settings.thresholdVariables["currentht"])
    edges = Image.fromarray(edges)
    edges = ImageTk.PhotoImage(image = edges)
    settings.imagelabels["altered"].configure(image=edges)
    settings.imagelabels["altered"].image = edges
    settings.images["edges"] = edges
    

def change_high_threshold (ht) :
    settings.thresholdVariables["currentht"] = int(ht)
    if settings.thresholdVariables["currentht"] <= settings.thresholdVariables["currentlt"] :
        settings.thresholdVariables["currentlt"] = settings.thresholdVariables["currentht"] - 1
        settings.sliders["lowthresholdslider"].set(settings.thresholdVariables["currentlt"])
    gausimg = cv2.GaussianBlur(settings.images["originalphotowithCV"], (5,5), settings.thresholdVariables["currentsigma"])
    edges = cv2.Canny(gausimg, settings.thresholdVariables["currentlt"], settings.thresholdVariables["currentht"])
    edges = Image.fromarray(edges)
    edges = ImageTk.PhotoImage(image = edges)
    settings.imagelabels["altered"].configure(image=edges)
    settings.imagelabels["altered"].image = edges
    settings.images["edges"] = edges
   

def images () :
    photo = tk.PhotoImage(file = settings.imagepath)
    photo = photo.subsample(2,2)

    image = cv2.imread(settings.imagepath)
    dim = (int(image.shape[1] * 50 / 100), int(image.shape[0] * 50 / 100))
    image = cv2.resize(image, dim, interpolation = cv2.INTER_LINEAR)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    edges = cv2.Canny(cv2.GaussianBlur(image, (5,5), settings.thresholdVariables["currentsigma"]),settings.thresholdVariables["currentlt"],settings.thresholdVariables["currentht"])
    edges = Image.fromarray(edges)
    edges = ImageTk.PhotoImage(image = edges)

    settings.images["originalphoto"] = photo
    settings.images["originalphotowithCV"] = image
    settings.images["edges"] = edges

def frames () :
    settings.frames["imageframe"] = tk.Frame(master=settings.m,background="white")
    settings.frames["originalimage"] = tk.Frame(master=settings.frames["imageframe"], background="white", borderwidth=1)
    settings.frames["alteredimage"] = tk.Frame(master=settings.frames["imageframe"], background="white", borderwidth=1)

    settings.frames["sliderframe"] = tk.Frame(master=settings.m, background="white")

    settings.frames["sigmasliderframe"] = tk.Frame(master=settings.frames["sliderframe"], background="white", relief=tk.RAISED, borderwidth=1, width=50, height=50)
    settings.frames["lowthresholdsliderframe"] = tk.Frame(master=settings.frames["sliderframe"], relief=tk.RAISED, background="white", borderwidth=1,width=30, height=30)
    settings.frames["highthresholdsliderframe"] = tk.Frame(master=settings.frames["sliderframe"], background="white", relief=tk.RAISED, borderwidth=1)
    
    settings.frames["endCannyframe"] = tk.Frame(master=settings.m, background="white")


def start_canny() :
    settings.thresholdVariables["currentlt"] = 0
    settings.thresholdVariables["currentht"] = 0
    settings.thresholdVariables["currentsigma"] = 0

    images()
    frames()

    settings.frames["imageframe"].grid(row=0, column=1, columnspan = 2, rowspan=4)
    
    settings.frames["originalimage"].grid(row=0, column=1, sticky="we", columnspan = 2)
    original = tk.Label(master=settings.frames["originalimage"], text="Original", image=settings.images["originalphoto"], background="white")
    original.pack()

    settings.frames["alteredimage"].grid(row=1, column=1, sticky="we", columnspan = 2)
    altered = tk.Label(master=settings.frames["alteredimage"], text="Altered", image=settings.images["edges"], background="white")
    altered.pack()

    settings.imagelabels["original"] = original
    settings.imagelabels["altered"] = altered

    settings.frames["sliderframe"].grid(row=0, column=4, sticky="n", rowspan=2)

    settings.frames["sigmasliderframe"].grid(row=0, padx=(5, 5), pady=(5, 5))
    sigmaslider = Scale(master=settings.frames["sigmasliderframe"], label="Sigma", from_=0, to=10, orient=HORIZONTAL, length=300, width=40, command=change_sigma, background="white")
    sigmaslider.pack()


    settings.frames["lowthresholdsliderframe"].grid(row=1,padx=(5, 5), pady=(5, 5))
    lowthresholdslider = Scale(master=settings.frames["lowthresholdsliderframe"], label="Low Threshold", from_=0, to=255, orient=HORIZONTAL, length=300, width=40, command=change_low_threshold, background="white")
    lowthresholdslider.pack()

    settings.frames["highthresholdsliderframe"].grid(row=2, padx=(5, 5), pady=(5, 5))
    highthresholdslider = Scale(master=settings.frames["highthresholdsliderframe"], label="High Threshold", from_=0, to=255, orient=HORIZONTAL, length=300, width=40, command=change_high_threshold, background="white")
    highthresholdslider.pack()

    settings.sliders["lowthresholdslider"] = lowthresholdslider
    settings.sliders["highthresholdslider"] = highthresholdslider

    settings.frames["endCannyframe"].grid(row=2, column=4, sticky="n", rowspan=2)

    end_canny = tk.Button(master=settings.frames["endCannyframe"], text="Start Measurements with Original Image", width=30, height=2, padx=5, pady=5, background="white")
    end_canny.pack()
    
    end_canny = tk.Button(master=settings.frames["endCannyframe"], text="Start Measurements with Canny Image", width=30, height=2, padx=5, pady=5, background="white")
    end_canny.pack()