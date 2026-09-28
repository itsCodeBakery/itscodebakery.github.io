# Content sources and interpretation

Updated 28 September 2026. This file is for maintenance; it does not load external content into the website.

## Profile

The user explicitly supplied the MS gold medal / first of 60, BS third of 120, and personal interests. Other education details and professional experience were retained from the existing portfolio. Counts are scoped to the projects actually featured here: six research projects, three published works, and three linked public code repositories.

## Publication dates

- PlantCLR: 31 March 2026, publisher article page: https://www.nature.com/articles/s41598-026-45684-x
- Secure WSN: proceedings/print date 23 March 2026, publisher-deposited metadata: https://api.crossref.org/works/10.1145/3748522.3779960 . The same deposit has a later online date of 9 June 2026. News explicitly describes the proceedings appearance.
- Beyond Labels: proceedings/print date 5 December 2025, publisher-deposited metadata: https://api.crossref.org/works/10.1109/SmartAgriSuSY68475.2025.11466957 . This is the proceedings date, not the later IEEE Xplore addition date.

## Project evidence

### PlantCLR

https://www.nature.com/articles/s41598-026-45684-x
https://github.com/itsCodeBakery/PlantPathology

Final published accuracy/F1: PlantVillage 99.10/99.04%; Cassava 96.83/96.70%. The pipeline includes supervised target-domain fine-tuning. Figures are from the paper and author repository. Old preliminary metrics were not used.

### ExViT-DR

Author-supplied manuscript evaluation materials, July 2026, and the existing portfolio. APTOS 2019, stratified 70/15/15 image split, 549-image test subset. Accuracy 98.54%; balanced accuracy 97.53%; macro F1 97.30%; 541 correct predictions. A new figure plots these supplied values. No public paper link was invented. The existing minor-revision status is retained.

### XDR-Net

https://github.com/itsCodeBakery/XDR-NET

Current README results: accuracy/macro F1/macro AUC (%) — APTOS 97.38/97.38/97.99; EyePACS 97.45/98.35/98.90; Messidor 96.82/96.95/97.50; IDRiD 95.90/96.17/96.75. Parameters 4.219M. APTOS final evaluation uses a fixed 550-image validation subset. Image-level partitions do not establish patient independence. Four-view TTA raises APTOS accuracy from 94.95 to 97.38% with additional inference cost. Qualitative Grad-CAM is not presented as clinical validation.

### CASR-Net

https://github.com/itsCodeBakery/scribble-uncertainty-lung-segmentation

Repository validation Dice/IoU: Dataset 1 0.8046/0.7165; Dataset 2 0.7879/0.6501. Model parameters 2.672M. Dataset 2 comparisons: foreground-only scribbles 0.1387 Dice; foreground/background scribbles 0.5769; CASR-Net 0.7879. Scribbles are derived from dense masks, and the teacher has dense supervision. It is described as a research manuscript without claiming conference acceptance.

### Beyond Labels

https://ieeexplore.ieee.org/document/11466957/
https://api.crossref.org/works/10.1109/SmartAgriSuSY68475.2025.11466957
https://ae.linkedin.com/in/majed-alshehhi-4a36843b1

Accuracy 97.67% and F1 98.12% are reported in coauthor Majed Alshehhi's publication announcement. Dataset/split details were not recovered from the publisher page; the portfolio makes that context explicit. The overview illustration comes from the author's existing conference presentation materials and is not represented as an experimental result. Author names were corrected against the publisher deposit.

### Secure WSN

https://dl.acm.org/doi/10.1145/3748522.3779960
https://api.crossref.org/works/10.1145/3748522.3779960

Method and qualitative result follow the author's supplied research presentation: digital PGD perturbation, physical-layer Bayesian optimization, and mixed batch normalization. The presentation reports stronger detection accuracy and ROI than Standard, AdvFGSM, AdvPGD, and AdvRT under hybrid attacks. No missing numerical benchmark was invented.

## Status and scope

Project abstracts are short research summaries based on the sources above, not verbatim transcriptions. Publication status is distinct from manuscript status. Project figures are illustrations or results with captions identifying their source and purpose. The site's bundled content is a dated snapshot, not a live bibliometric feed.
