<template>
  <div class="photos" v-if="photos.length > 0">
    <a
      class="photos__link"
      target="_blank"
      v-for="photo in photos"
      :key="photo.id"
      :href="photo.download_url"
    >
      <img
        class="photos__image"
        :src="photo.download_url"
        :alt="photo.author"
      />
    </a>
  </div>
  <Loader v-else></Loader>
</template>

<script>
import Loader from "../components/Loader";

export default {
  name: "Photos",
  components: {
    Loader,
  },
  data() {
    return {
      photos: [],
    };
  },
  async created() {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await this.getPhotos(Math.floor(Math.random() * (100 - 1) + 1));
  },
  methods: {
    async getPhotos(page) {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=9`
      );
      const result = await response.json();

      this.photos.push(...result);
    },
  },
};
</script>

<style lang="scss" scoped>
.photos {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 570px;
  margin: 0 auto;

  &__link {
    width: calc((100% / 3) - (30px / 3));
    max-height: 120px;
    margin-bottom: 15px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
    background-color: #757f9a;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
