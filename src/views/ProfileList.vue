<template>
    <div class="container" style="margin-bottom: 50px;">
        <div class="row">
            <div class="col-md-3 mb-3" v-for="user in users" :key="user.id">
                <router-link :to="{ name: 'profile', params: { userId: user.id } }">
                    <div class="card shadow rounded">
                        <div class="d-flex flex-row">
                        <img :src="user.avatarUrl ? user.avatarUrl : '/src/assets/profile.png'" class="card-img-top user-avatar rounded-circle" alt="User avatar">
                        <div class="card-body">
                            <h5 class="card-title">{{ user.name }}, {{ user.city }}</h5>
                            <div v-for="dog in user.dogs" :key="dog.id">
                            <p class="card-text"><strong>{{ dog.name }}</strong> {{ dog.race }}, {{ dog.age }}{{ dog.age <= 1 ? ' r.' : ' l.' }}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref, onMounted } from 'vue';
    import { doc, getDocs, collection } from 'firebase/firestore';
    // import { getStorage, getDownloadURL } from 'firebase/storage';
    import { db } from '@/firebase';

    export default {
        setup() {
        const users = ref([])
            //Zmienic!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            //         const currentUserId = firebase.auth().currentUser.id;
        const currentUserId = 'xo9FaiazKTo5ATkJa7Bj';
        const userRef = doc(db, 'users', currentUserId);

        const getAge = (year) => {
            const today = (new Date()).getFullYear();
            return today - year;
        };


        // async function getImageUrl(avatarUrl) {
        //     const storage = getStorage();
        //     const gsReference = ref(storage, avatarUrl);
        //     try {
        //         const url = await getDownloadURL(gsReference);
        //         return url;
        //     } catch (error) {
        //         console.log('Error getting image URL:', error);
        //         return '';
        //     }
        // }

        onMounted(async () => {
        const querySnapshot = await getDocs(collection(db, 'users'));

        const fbUsersList = [];
        for (const doc of querySnapshot.docs) {
            const data = doc.data()
            const dogs = data.dogs.map(dog => {
                const age = getAge(dog.yearOfBirth);
                return { name: dog.name, race: dog.race, age: age };
            });
            const user = { 
                id: doc.id, 
                name: data.name,
                city: data.city,
                dogs: dogs,
                // avatarUrl: getImageUrl(data.avatarUrl)
            };
            
            fbUsersList.push(user);
        }
        users.value = fbUsersList;
        });

        return {users}
        }
    }
</script>

<style>
    .user-avatar {
        margin-top: 7px;
        margin-left: 15px; 
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 50%;
    }
    .card:hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }
</style>