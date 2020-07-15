# Image Management

- [Image Management](#image-management-1)
    - [Creating an Image](#creating-an-image)
    - [Viewing Images](#viewing-images)
    - [Deleting Images](#deleting-images)


## Creating an Image

You can use the  **docker pull**,  **docker build**,** docker commit**,  **docker import**, or  **docker load**  command to create an image. For details about how to use these commands, see  [4.6.3 Image Management](#image-management-43.md#EN-US_TOPIC_0184808261).

### Precautions

1.  Do not concurrently run the  **docker load**  and  **docker rmi**  commands. If both of the following conditions are met, concurrency problems may occur:

    -   An image exists in the system.
    -   The docker rmi and docker load operations are concurrently performed on an image.

    Therefore, avoid this scenario. \(All concurrent operations between the image creation operations such as running the  **tag**,  **build**, and  **load**, and  **rmi**  commands, may cause similar errors. Therefore, do not concurrently perform these operations with  **rmi**.\)

2.  If the system is powered off when docker operates an image, the image may be damaged. In this case, you need to manually restore the image.

    When the docker operates images \(using the  **pull**,  **load**,  **rmi**,  **build**,  **combine**,  **commit**, or  **import**  commands\), image data operations are asynchronous, and image metadata is synchronous. Therefore, if the system power is off when not all image data is updated to the disk, the image data may be inconsistent with the metadata. Users can view images \(possibly none images\), but cannot start containers, or the started containers are abnormal. In this case, run the  **docker rmi**  command to delete the image and perform the previous operations again. The system can be recovered.

3.  Do not store a large number of images on nodes in the production environment. Delete unnecessary images in time.

    If the number of images is too large, the execution of commands such as  **docker image**  is slow. As a result, the execution of commands such as  **docker build**  or  **docker commit**  fails, and the memory may be stacked. In the production environment, delete unnecessary images and intermediate process images in time.

4.  When the  **--no-parent**  parameter is used to build images, if multiple build operations are performed at the same time and the FROM images in the Dockerfile are the same, residual images may exist. There are two cases:
    -   If FROM images are incomplete, the images generated when images of FROM are running may remain. Names of the residual images are similar to  **base\_v1.0.0-app\_v2.0.0**, or they are none images.
    -   If the first several instructions in the Dockerfile are the same, none images may remain.


### None Image May Be Generated

1.  A none image is the top-level image without a tag. For example, the image ID of  **ubuntu**  has only one tag  **ubuntu**. If the tag is not used but the image ID is still available, the image ID becomes a none image.
2.  An image is protected because the image data needs to be exported during image saving. However, if a deletion operation is performed, the image may be successfully untagged and the image ID may fail to be deleted \(because the image is protected\). As a result, the image becomes a none image.
3.  If the system is powered off when you run the  **docker pull**  command or the system is in panic, a none image may be generated. To ensure image integrity, you can run the  **docker rmi**  command to delete the image and then restart it.
4.  If you run the  **docker save**  command to save an image and specify the image ID as the image name, the loaded image does not have a tag and the image name is  **none**.

### A Low Probability That Image Fails to Be Built If the Image Is Deleted When Being Built

Currently, the image build process is protected by reference counting. After an image is built, reference counting of the image is increased by 1 \(holdon operation\). Once the holdon operation is successful, the image will not be deleted. However, there is a low probability that before the holdon operation is performed, the image can still be deleted, causing the image build failure.

## Viewing Images

Run the following command to view the local image list:

```
docker images
```

## Deleting Images

### Precautions

Do not run the  **docker rmi –f **_XXX_  command to delete images. If you forcibly delete an image, the  **docker rmi**  command ignores errors during the process, which may cause residual metadata of containers or images. If you delete an image in common mode and an error occurs during the deletion process, the deletion fails and no metadata remains.

